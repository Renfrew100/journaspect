import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, where, query, setDoc, doc, addDoc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB9a01S71En19HM5yi1G3sftbuxvarjDrY",
    authDomain: "journaspect.firebaseapp.com",
    projectId: "journaspect",
    storageBucket: "journaspect.appspot.com",
    messagingSenderId: "684108648570",
    appId: "1:684108648570:web:f0fba6be0ca49c16292bc3"
};

console.log('initilizing firebase');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();

export async function searchJournalists(queryString) {
  if(!queryString) {
    return [];
  }
  const tokens = queryString.trim().split(' ');
  const col = query(collection(db, 'journalists'), where('tags', 'array-contains-any', tokens));
  const snap = await getDocs(col);
  const list = snap.docs.map(doc => doc.data());
  return list;
}

export async function addJournalist(firstName, lastName, photoFile) {
  console.log(photoFile);
  const path = 'images/' + photoFile.name;
  const imageRef = ref(storage, path);
  await uploadBytes(imageRef, photoFile);
  console.log('file-uploaded');

  const docRef = await addDoc(collection(db, 'journalists'), {
    firstName: firstName,
    lastName: lastName,
    photoURL: 'images/' + photoFile.name,
    tags: [firstName.toLowerCase(), lastName.toLowerCase()]
  });
  return docRef.id;
}

export async function getJournalist(id) {
  const docSnap = await getDoc(doc(db, 'journalists', id));
  if(!docSnap.exists()) {
    return null;
  }
  return docSnap.data();
}

export async function signUpUser(email, password, name, photoURL) {
  console.log(name);
  const q = query(collection(db, 'users'), where('displayName', '==', name));
  const snap = await getDocs(q);
  if(snap.size) {
    throw {code: 'auth/username-exists'};
  }
  let user;
  try {
    user = (await createUserWithEmailAndPassword(auth, email, password)).user;
  } catch(e) {
    if(e.code === 'auth/email-already-in-use') {
      throw e;
    } else {
      throw {code: 'auth/undefined'}
    }
  }
  try {
    await setDoc(doc(db, 'users', user.uid), {displayName: name});
  } catch(e) {
    throw {code: 'auth/undefined'}
  }
  await updateProfile(user, {
    photoURL: photoURL
  });
  return userManager.getCurrentUser();
}

export async function signInUser(email, password) {
  let user;
  user = (await signInWithEmailAndPassword(auth, email, password)).user;
  const docSnap = await getDoc(doc(db, 'users', user.uid));
  if(!docSnap.exists()) {
    throw {code: 'auth/user-not-found-in-db'};
  }
  //doc = docSnap.data();
  //return {name: doc.displayName, email: user.email, photoURL: user.photoURL};
  return userManager.getCurrentUser();
}

export async function signOutUser() {
  await signOut(auth);
  return true;
}

onAuthStateChanged(getAuth(), (user) => {
  userManager.setUser(user);
});

export const userManager = {
  user: null,
  subscribers: [],

  async setUser(user) { 
    if(!user) {
      this.user = null;
      return;
    }
    const docSnap = await getDoc(doc(db, 'users', user.uid));
    if(!docSnap.exists()) {
      throw {code: 'auth/user-not-found-in-db'};
    }
    const userDoc = await docSnap.data();
    this.user = {name: userDoc.displayName, email: user.email, photoURL: user.photoURL};

    for(let i = 0, len = this.subscribers.length; i != len; ++i) {
      this.subscribers[i](this.user);
    }
  },

  getCurrentUser() {
    return this.user;
  },

  subscribe(callback) {
    this.subscribers.push(callback);
  }
};

export async function addJournalistReview(journalistId, user, review) {
  // TODO atomic
  const ratings = {};
  if(review.overallRating) {
    ratings.overallNum = increment(1);
    ratings.overallRating = review.ethicsRating;
  }
  if(review.ethicsRating) {
    ratings.ethicsNum = increment(1);
    ratings.ethicsTotal = review.ethicsRating;
  }
  if(review.writingRating) {
    ratings.writingNum = increment(1);
    ratings.writingTotal = review.ethicsRating;
  }
  if(review.accuracyRating) {
    ratings.accuracyNum = increment(1);
    ratings.accuracyTotal = review.ethicsRating;
  }
  if(review.politicalRating) {
    ratings.politicalTotal = increment(1);
    ratings.politicalRating = review.ethicsRating;
  }
  await updateDoc(doc(db, 'journalists', journalistId), ratings);
  const docRef = await addDoc(collection(db, 'journalists/' + journalistId + '/reviews'), {
    reviewer: user.name,
    reviewerPhotoURL: user.photURL,
    review: review.writtenReview,
  });

  console.log(docRef);
  return docRef.data();
}