import React, {useState} from "react";
import { useForm } from "react-hook-form";

const errorMessages = {
  "required": "Error: Pick pls file before submit",
  "acceptedFormats": "Error: the  file should be PDF formats",
  "lessThan10MB": "Error: the  file should be under 10MB"

}

function FileSubmit() {
  const { register, handleSubmit, formState: { errors } } = useForm() ;
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState();

  const onSubmit = (data) => {
      console.log(data)
      setMessage("The File was uploaded")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
               type='file'
               onChange={setFile}
               placeholder='Upload Your Resume'
               {...register('resume', {
               required: true,
               validate: {
                    lessThan10MB: (files) => files[0]?.size < 10000000 || 'Max 10MB',
                    acceptedFormats: (files) => files[0].type === 'application/pdf',
               },
               })}
          />
         <p> {errors.resume?.type? errorMessages[errors.resume?.type] : message }</p>
          
          

      <button>Submit</button>
    </form>
  );
}

export default FileSubmit;