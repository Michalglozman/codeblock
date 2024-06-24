import React, { useState, useEffect } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

import io from 'socket.io-client';
const socket = io.connect(process.env.REACT_APP_SERVER_URL)

export default function CodeBlock() {
    const [code, setCode] = useState('');
    const [block, setBlockData] = useState({});
    const { id } = useParams();
    const [role, setRole] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/getBlockData/?id=${id}`);
                const jsonResponse = await response.json();
                setBlockData(jsonResponse);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        joinRoom();
        
        // Listen for role assignment from server
        socket.on("role_assigned", (data) => {
            setRole(data.role);
        });

        return () => {
        socket.off("role_assigned");
      };
    }, [id]);

    const handleChange = (e) => {
        console.log(`code : ${e.target.textContent}`);
        sendMessage(e.target.textContent);
    };

    const joinRoom = () => {
        socket.emit("join_room", id);
    };

    const sendMessage = (codeToSend) => {
        console.log(`sending ${codeToSend}`)
        socket.emit("send_message", { message: codeToSend, room: id });
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setCode(data.message);
        });
    }, []);
    return (
        <>
            <h1>{block.title}</h1>
            <h3>Hello, {role}</h3>
            <Typography variant="h5" gutterBottom className="text-wrap">
                {block.guildLines}
            </Typography>

            <CodeEditor
                value={code}
                language="js"
                placeholder="Please enter JS code."
                onChange={(evn) => handleChange(evn)}
                readOnly={role === 'mentor'}
                padding={15}
                style={{
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',

                    width: "800px",
                }}
            />
        </>
    );
}
