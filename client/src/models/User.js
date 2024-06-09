async function createUser(formData){
  const req = await fetch("http://localhost:3000/users/register", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData)
  });

  const data = await req.json();

  return {
    status: req.status,
    payload: data.payload,
    msg: data.msg,
  };
}

async function loginUser(formData){
  const req = await fetch("http://localhost:3000/users/login", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData)
  });

  return {
    status: req.status,
  };
}


export {
  createUser,
  loginUser
}