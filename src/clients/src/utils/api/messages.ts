import axios from 'axios'

export const postOneMessage = async (message: string) => {
 const response = await axios.post('/api/messages', {
    message
  })
  return response
}