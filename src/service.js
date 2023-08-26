import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, where, query, setDoc, doc, addDoc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA97XipM1XzOmFQqcuO52LO621w61CAD8o",
  authDomain: "journaspect-81c48.firebaseapp.com",
  projectId: "journaspect-81c48",
  storageBucket: "journaspect-81c48.appspot.com",
  messagingSenderId: "562258435625",
  appId: "1:562258435625:web:aa405d2709f5c235158638",
  measurementId: "G-8346B0SYZB"
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
  const tokens = queryString.trim().toLowerCase().split(' ');
  const col = query(collection(db, 'journalists'), where('tags', 'array-contains-any', tokens));
  const snap = await getDocs(col);
  const journalists = [];
  for(const doc of snap.docs) {
    journalists.push(normalizeJournalist(doc));
  }
  return journalists;
}

function normalizeJournalist(doc) {
  const journalist = doc.data();
  journalist.id = doc.id;
  return journalist;
}

export async function addJournalist(firstName, lastName, photoFile) {
  console.log(photoFile);
  const path = 'images/' + photoFile.name;
  const imageRef = ref(storage, path);
  await uploadBytes(imageRef, photoFile);
  console.log('file-uploaded');

  const photoURL = await getDownloadURL(ref(storage, path));
  const docRef = await addDoc(collection(db, 'journalists'), {
    firstName: firstName,
    lastName: lastName,
    photoURL: photoURL,
    tags: [firstName.toLowerCase(), lastName.toLowerCase()]
  });
  return docRef.id;
}

export async function removeJournalist(firstName, lastName, photoFile) {
  console.log(photoFile);
  const path = 'images/' + photoFile.name;
  const imageRef = ref(storage, path);
  await uploadBytes(imageRef, photoFile);
  console.log('file-uploaded');

  const photoURL = await getDownloadURL(ref(storage, path));
  const docRef = await addDoc(collection(db, 'journalists'), {
    firstName: firstName,
    lastName: lastName,
    photoURL: photoURL,
    tags: [firstName.toLowerCase(), lastName.toLowerCase()]
  });
  return docRef.id;
}


export async function getJournalist(id) {
  const docSnap = await getDoc(doc(db, 'journalists', id));
  if(!docSnap.exists()) {
    return null;
  }
  const journalist = docSnap.data();
  journalist.id = docSnap.id;
  return journalist;
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
  console.log('signed out');
  return true;
}

export async function MyProfileButton() {
  await MyProfileButton();
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
  console.log(user);
  console.log(review);
  // TODO atomic
  const ratings = {};
  if(review.overallRating) {
    ratings.overallNum = increment(1);
    ratings.overallRating = increment(review.overallRating);
  }
  if(review.ethicsRating) {
    ratings.ethicsNum = increment(1);
    ratings.ethicsRating = increment(review.ethicsRating);
  }
  if(review.writingRating) {
    ratings.writingNum = increment(1);
    ratings.writingRating = increment(review.writingRating);
  }
  if(review.accuracyRating) {
    ratings.accuracyNum = increment(1);
    ratings.accuracyRating = increment(review.accuracyRating);
  }
  if(review.politicalRating) {
    ratings.politicalTotal = increment(1);
    ratings.politicalRating = increment(review.politicalRating);
  }
  await updateDoc(doc(db, 'journalists', journalistId), ratings);
  //Uncaught (in promise) FirebaseError: Function addDoc() called with invalid data. Unsupported field value: undefined (found in field reviewerPhotoURL in document journalists/2FKmSKPDcuP68yr83paV/reviews/o641S54tuTZjAmw8XkD9)
  await addDoc(collection(db, 'journalists/' + journalistId + '/reviews'), {
    reviewer: user.name,
    reviewerPhotoURL: user.photoURL,
    review: review.writtenReview
  });
}

export async function getJournalistReview(id) {
  const docSnaps = await getDocs(collection(db, 'journalists/' + id + '/reviews'));
  const reviews = [];
  docSnaps.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    reviews.push(doc.data());
  });
  
  console.warn(reviews);
  return reviews;
}