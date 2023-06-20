import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import SettingsIcon from "./SettingsIcon";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import coachkenbest from "../img/coachkenbest.png";
import SetAvatar from "./SetAvatar";
import LazyLoad from "react-lazyload";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    // Replace with your static data for messages
    const staticMessages = [
      { fromSelf: false, message: "Hi I am Ken! How can I help you today?" },
    ];
    setMessages(staticMessages);
  }, []);

  const handleAvatarSelection = (avatarIndex) => {
    setSelectedAvatar(avatarIndex);
  };

  const handleSendMsg = async (msg) => {
    // Replace with your static data for sending messages
    receiveResponse(msg)
    const newMessage = { fromSelf: true, message: msg };
    setMessages([...messages, newMessage]);
  };

  const receiveResponse = async (msg) => {

    let url = process.env.REACT_APP_API_URL + "/chat/chat"
    fetch(url, {
      method: 'POST',
      mode: "cors",
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"prompt": msg})
    }).then(data => data.json()).then(data => setResponse(data))
  }


  const setResponse = (reply) => {
    const newMessage = { fromSelf: false, message: reply.message };
    setArrivalMessage(newMessage)
  }


  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <LazyLoad once>
              <img src={coachkenbest} alt="" />
            </LazyLoad>
          </div>
        </div>
        <SettingsIcon />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"
                  }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    height: 4.9rem;
    background-color: white;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 4rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      margin-top: 0.7rem;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: white;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #455cf6;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #c0c0c0;
      }
    }
  }
`;
