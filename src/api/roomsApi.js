export function getRoomsList(options = {}) {
  return {
    action: '/api/rooms',
    params: {
      method: 'GET',
      redirect: 'follow',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json;charset=utf-8',
        'Content-Type': 'application/json'
      }
    }
  };
}

export function updateRoom(options = {}) {
  const {id, name} = options;

  return {
    action: `/api/rooms/${id}`,
    params: {
      method: 'PATCH',
      redirect: 'follow',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json;charset=utf-8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name})
    }
  };
}
