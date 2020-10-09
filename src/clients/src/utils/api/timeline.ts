import { Timeline } from '../../types/timeline';
import axios from 'axios';

export const postOneTimeline = async (type: string, id: string, updates?: object) => {
  const response = await axios.post('/api/timelines', {
    type,
    id,
    updates
  });
  return response;
};
