import React,{useState,useEffect} from 'react'
import client from '../appWriteConfig'
import {ID,Query} from 'appwrite'
import {Trash2} from 'react-feather'
import conf from '../conf/conf'
import { databases } from '../appWriteConfig'

function Room() {
  
   const [messages,setMessages]=useState([])
   const [messageBody,setMessageBody]=useState('')
   
    useEffect(()=>{
        getMessages()
        const unsubscribe=client.subscribe(`databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId }.documents`, response => {
            // Callback will be executed on changes for documents A and all files.
            
            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                console.log('A MESSAGE WAS CREATED');
                setMessages(prevState=>[response.payload,...prevState])
            }
               
            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                console.log('A MESSAGE WAS DELETED!!!');
               setMessages(prevState=>prevState.filter(message=>message.$id !==response.payload.$id))
            }
                
                
        });
        
             return ()=>{
                 unsubscribe();
             };
        
       
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault()

        let payload={
            body:messageBody
        }
     

        let response=await databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            ID.unique(),
            payload,
           
        )
        console.log("Created!",response);
        //setMessages(prevState=>[response,...prevState])
        
        setMessageBody('')
    }
    const getMessages=async()=>{
       const response=await databases.listDocuments(
        conf.appwriteDatabaseId,conf.appwriteCollectionId,
        [
            Query.orderDesc('$createdAt'),
            Query.limit(20)
        ]
    )
       console.log('RESPONSE',response);
       setMessages(response.documents)
       
    }

    const deleteMessage=async(message_id)=>{
        await databases.deleteDocument(
            conf.appwriteDatabaseId, // databaseId
            conf.appwriteCollectionId, // collectionId
            message_id // documentId
        );
        //setMessages(prevState=>messages.filter(message=>message.$id !==message_id))
    }
    
  return (
    <main className='container'>
     <div className='room--container'>
        <form onSubmit={handleSubmit} id="message--form">
            <div>
                <textarea required
                maxLength="1000"
                placeholder="say-something.."
                onChange={(e)=>{setMessageBody(e.target.value)}}
                value={messageBody}
                
                >

                </textarea>
            </div>
            <div className='send-btn--wrapper'>
                <input className='btn btn--secondary' type="submit" value="send"/>
            </div>
        </form>
            <div>
                {messages.map((message)=>(
                    <div key={message.$id} className='message--wrapper'>
                        <div className='message--header'>
                            <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
                            <Trash2 
                            className='delete--btn'
                            onClick={()=>{deleteMessage(message.$id)}}/>
                            
                        </div>
                        <div className='message--body'>
                            <span>{message.body}</span>
                        </div>
                        
                        </div>
                ))}
            </div> 

      </div>
    </main>
  )
}

export default Room
