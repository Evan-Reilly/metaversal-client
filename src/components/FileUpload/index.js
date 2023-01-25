import React, {useState} from 'react';
import Papa from "papaparse";
import axios from "axios";

function FileUploadPage(){
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
	const [fileText, setFileText] = useState();

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = async () => {
		const formData = new FormData();

		formData.append('File', selectedFile);
        console.log("typeof file: ", selectedFile);

         // If user clicks the parse button without
        // a file we show a error
        if (!isSelected) return console.log("Enter a valid file");
 
        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
			await axios.post(`http://cidra1.fyre.ibm.com:4000/v1/bucket/create-text-file`, {
				bucketName: "mv-objectstorage",
				itemName: selectedFile.name,
				fileText: target.result,
			}, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}).then((response)=> {
				console.log("response: ", response);
			}).catch((error) => {
				console.log("error: ", error);
			});
        };
       
		var text = reader.readAsText(selectedFile);
		console.log("reader.readAsText: ", text);
		const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzlhMjBmYzMyNGM1YzAxNjQxMGY4M2UiLCJpYXQiOjE2NzM5MDU3ODUsImV4cCI6MTY3MzkwNzU4NSwidHlwZSI6ImFjY2VzcyJ9.tmfl7NkyDdpvWUEASJjAABUoTWGGEwFBB3SuYCDqzCQ";

	};

    return (
        <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
};


export default FileUploadPage;
