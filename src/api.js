import axios from 'axios'

const baseUrl = "http://127.0.0.1:8000"

export const getToken = ({ auth, username, password }) => {
  axios({
    method: 'post',
    url: `${baseUrl}/token/`,
    data: {
      username,
      password,
    }
  }).then(response => {
    console.log('GET TOKEN RESPONSE: ', response)
    auth.setAccessToken(response.data.access)
  })
  .catch(error => console.log('ERROR: ', error))
  auth.setAccessToken(undefined)
}

export const fetchUser = ({ auth }) => {
  axios({
    method: 'get',
    url: `${baseUrl}/profile/`, 
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  }).then(response => {
    console.log('PROFILE: ', response)
  })
  .catch(error => {
    console.log('ERROR: ', error)
    // auth.setAccessToken(undefined)
  })
}

export const createUser = ({ username, password, firstName, lastName, auth }) => {
  axios({
    method: 'post',
    url: `${baseUrl}/create-user/`, 
    data: {
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName
    },
  }).then(response => {
    console.log('CREATE USER: ', response)
  })
  .catch(error => {
    console.log('ERROR: ', error)
  })
}


export const getImages = ({ auth }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-images/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
  })
}

export const createImage = ({ title, image, auth }) => {
  console.log("auth: ", auth)
  return axios({
    method: 'post',
    url: `${baseUrl}/create-image/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      image,
      title,
    }
  })
}

export const updateImage = ({ auth, imageId, updatedData }) => {
  console.log("AUTH, IMAGEID, TITLE: ", auth)
  return axios({
    method: 'put',
    url: `${baseUrl}/get-images/${imageId}/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'application/json'
    },
    data: {
      updatedData
    }
  });
};

// export const deleteImage = ({ auth, imageId }) => {
//   return axios({
//     method: 'delete',
//     url: `${baseUrl}/get-images/${imageId}/`,
//     headers: {
//       Authorization: `Bearer ${auth.accessToken}`
//     },
//     data: {
//       image: imageId
//     }
//   });
// };


// export const getPosts = ({ auth }) => {
//   return axios({
//     method: 'get',
//     url: `${baseUrl}/get-posts/`,
//     headers: {
//       Authorization: `Bearer ${auth.accessToken}`
//     }
//   })
// }

// export const createPost = ({ author, content, created_at, auth}) => {
//   return axios({
//     method: 'post',
//     url: `${baseUrl}/create-post/`,
//     headers: {
//       Authorization: `Bearer ${auth.accessToken}`
//     },
//     data: {
//       author: author,
//       content: content,
//       created_at: created_at,
//     }
//   })
// } 