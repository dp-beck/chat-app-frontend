let devState = development;
let url;

if (devState === development) {
    url = 'http://localhost:3000';
} else {
    url = 'https://chat-app-backend-o1po.onrender.com';
};

export {url};

