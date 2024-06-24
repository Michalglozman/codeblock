import React, { useState, useEffect } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';
import axios from 'axios';

import io from 'socket.io-client';
const socket = io.connect(process.env.REACT_APP_SERVER_URL);

export default function CodeBlock() {

    const [code, setCode] = useState('');
    const [block, setBlockData] = useState({});
    const { id } = useParams();
    const [role, setRole] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [emojiSymbol, setEmojiSymbol] = useState(null);
    const [showEmoji, setShowEmoji] = useState(false);

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

        socket.on("role_assigned", (data) => {
            setRole(data.role);
        });

        return () => {
            socket.off("role_assigned");
        };
    }, [id]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setCode(data.message);
        });

        return () => {
            socket.off("receive_message");
        };
    }, []);

    const joinRoom = () => {
        socket.emit("join_room", id);
    };

    const handleChange = (e) => {
        setCode(e.target.value);
        sendMessage(e.target.value);
    };

    const sendMessage = (codeToSend) => {
        socket.emit("send_message", { message: codeToSend, room: id });
    };

    const handleSubmit = async () => {
        if (role != "mentor") {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_SERVER_URL}/saveCode`,
                    { id, code }
                );
                console.log('Code submitted and saved:', response.data.message);
                if (response.data.message == "Code saved successfully") {
                    setEmojiSymbol(0x1F920);
                }
                else {
                    setEmojiSymbol(0x1F928);
                }
                setShowEmoji(true);
                setTimeout(() => {
                    setShowEmoji(false);
                }, 3000);
            } catch (error) {
                console.error('Error saving code:', error);
            }
        }
    };

    const handleHint = () => {
        setShowHint(true);
        setTimeout(() => {
            setShowHint(false);
        }, 5000);
    };

    const Emoji = React.memo(({ className, label, symbol }) =>
        <span className={className} role="img" aria-label={label}>
            {String.fromCodePoint(symbol)}
        </span>)

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

            {showHint && (
                <div className="hint-window">
                    <pre>{block.answer}</pre>
                </div>
            )}
            <div style={{ marginTop: '20px', display: 'inline-flex', alignItems: 'center' }}>
                <Tooltip title="Hint">
                    <IconButton
                        size="large"
                        onClick={handleHint}
                        sx={{
                            bgcolor: 'lightyellow',
                            borderRadius: '50%',
                            padding: '12px',
                            '&:hover': {
                                bgcolor: 'lightblue',
                            },
                        }}
                    >
                        <LightbulbIcon sx={{ color: 'orange' }} />
                    </IconButton>
                </Tooltip>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleSubmit}
                    sx={{
                        marggin: "2px",
                        bgcolor: 'pink',
                        borderRadius: '50px',
                        padding: '9px 24px',
                        '&:hover': {
                            bgcolor: 'lightgreen',
                        },
                    }}
                >
                    <DoneIcon sx={{ fontSize: 30, color: '#fff' }} />
                    <b>Submit</b>
                </Button>
                {showEmoji && emojiSymbol && (
                    <div className="center-screen">
                        <Emoji symbol={emojiSymbol} label="response-emoji" />
                    </div>
                )}
            </div>
        </>
    );
}
