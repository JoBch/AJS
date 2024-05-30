import {createRoot} from 'react-dom/client';
import { App } from './components/App.jsx';

const rot = createRoot(document.querySelector("#root"));
rot.render(<App/>);

// useEffect(() => {
//     const fetchData = () => {
//         onValue(assignmentsRef, snapshot => {
//             const data = snapshot.val();

//             //Convert the data into an array of card objects
//             const fetchedCards = Object.keys(data).map(key => ({
//                 id: key,         //Set the id property to the key
//                 ...data[key]     //Include all other properties from the data in the key using spread
//             }));
//             setCards(fetchedCards);
//         });
//     };
//     fetchData();
// }, []);
