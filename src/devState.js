let devState = true;
let url;

if (devState === true) {
    url = 'http://localhost:3000';
} else {
    url = 'https://chat-app-backend-o1po.onrender.com';
};

console.log(url);

export default url;

