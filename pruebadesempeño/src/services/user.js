export const getUsers = async () => {
  try {
    const data = await fetch("http://localhost:3000/usuarios");
    const response = await data.json();
    return response;
  } catch (error) {
    console.log("Internal error", err);
  }
};

// export const getUsers = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// };

export const getUserById = async (id) => {
  try {
    if(!id){
        throw new Error(
            "El id es obligatorio"
        )
    }
    const data = await fetch(`http://localhost:3000/usuarios/${id}`);
    const response = await data.json();
    return response;
  } catch (err) {
    console.log("internal error",err);
  }
};

export const createUser = async (user) =>{
    try{
        const data = await fetch(`http://localhost:3000/usuarios`,{
            method: "POST",
            headers:{
                "content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });
        const response = await data.json();
        return response;
    }catch(err){
        console.log("internal error",err)
    }
}