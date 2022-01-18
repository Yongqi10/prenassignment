import React, { Fragment } from "react";
import { useState } from "react/cjs/react.development";

function Edit(props) {

    const [name,setName] = useState('');
    const id = props.id

    const update = async () =>{
        try {
            const body = {name: `${name}`}
            const response = await fetch(`http://localhost:5000/movies/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            console.log(response)
            window.location = "/List"
        } catch (err) {
            console.error(err.message)
        }

    }


    const onChange = (e)=>{
        setName(()=> e.target.value)
        console.log(name)
    }




  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Name
              </h5>
            </div>
            <div className="modal-body">
                <input type="text" className="form-control" onChange = {onChange}/>
                </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={update}>
              Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Edit;
