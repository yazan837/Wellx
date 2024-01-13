// adb reverse tcp:9090 tcp:9090
// adb reverse tcp:8081 tcp:8081
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import "firebase/crashlytics";

const firebaseConfig = {
  apiKey: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
const firebaseApp: any = initializeApp(firebaseConfig);

export const getTermsAndConditionsData = async () => {
  try {
    const db = getFirestore(firebaseApp);
    const querySnapshot = await getDocs(collection(db, "app_config"));
    let termsData = null;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data && data.TermsData) {
        termsData = data.TermsData;
      }
    });
    return termsData;
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};
