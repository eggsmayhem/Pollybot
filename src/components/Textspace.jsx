import React, {useState, useRef} from "react"
import axios from "axios"

const Textspace = () => {
    const [message, setMessage] = useState('');
    const handleMessageChange = event => {
        // 👇️ access textarea value
        setMessage(event.target.value);
        console.log(event.target.value);
      };
    const speechText = useRef();

    // let s3_url = "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

    const submitHandler = async e => {
        e.preventDefault();
        // const postText = {
        //     text: speechText,
        //     voice: "Joey"
        // };
        const speechData = {
            text: speechText.current.value,
            "voice": "Joey"
        }
        console.log(speechData)
        try {
            const speech = await axios.post(import.meta.env.VITE_BUCKET_NAME, speechData)
            // console.log(postText + "butttt")
            const s3_url = speech.data.url
            console.log(speech.data.url)
            let audio = new Audio(s3_url);
            audio.play();
        }
        catch(err) {
            console.log(err)
        }
    }
    return (
        <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
            <textarea id="message" name="message" value={message} onChange={handleMessageChange} ref={speechText} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
            <div className="flex space-x-2 justify-center">
                <button onClick={submitHandler} type="submit" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
            </div>
        </div>
    )
}

export default Textspace; 