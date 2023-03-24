import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, listAll } from "firebase/storage";
import secretKeys from './key.json';
const firebaseConfig = secretKeys;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const getImages = (storageRef) => {
    listAll(storageRef)
    .then((res) => {
        let arr = []
        res.items.forEach((itemRef,index) => {
            getDownloadURL(itemRef)
            .then((url) => {
                // console.log(url)
                arr.push({url: url, name: itemRef.name, key: index})
                // console.log(arr)
            })
        })
        console.log(arr)
        return arr
    })
    .catch((error) => {
        console.log(error)
    })
}