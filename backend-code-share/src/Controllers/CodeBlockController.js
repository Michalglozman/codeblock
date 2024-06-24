
const blocksList = require('../Model/codeBlock')

const saveData = async (req, res) => {
  const { id, code } = req.body;

  try {
      const block = await blocksList.findById(id);
      if (!block) {
          return res.status(404).json({ error: 'Block not found' });
      }

      block.code = code; 
      await block.save();

      return res.status(200).json({ message: 'Code saved successfully' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
  }
};


const getCodeBlocks = async(req, res) => {
    blocksList.find({}).then((results) =>{
        res.send(results);
    }).catch((e)=>{
        console.log(e);
    })
    
  } 

  const getCodeBlockData = async(req, res) => {
    const id = req.query.id;
    const query ={'codeId': `${id}`};
    blocksList.findOne(query).then((block) =>{
        res.send(block);
    }).catch((e) => {
        console.log(e);
        res.status(500).send();
    });
  } 
  const mentors = {};
  function handleJoinRoom(socket, data) {
      socket.join(data);
      let role = "student";
      if (!mentors[data]) {
          mentors[data] = socket.id;
            role = "mentor";
      } else if(mentors[data] == socket.id) {
        role = "mentor";
      }
      socket.emit("role_assigned", { role });

      console.log(`User ${socket.id} joined room ${data} role ${role}`);
  }

  
module.exports={getCodeBlocks, getCodeBlockData, handleJoinRoom, saveData};