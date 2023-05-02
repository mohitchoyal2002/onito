import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import form from "../style/form.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from 'axios'
import { useRef } from "react";

const Form = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    age: yup.number("Age is required").required("Please specify your age").max(90, "must be less than 90").min(10, "must be greater than 10"),
    sex: yup.string().required("Please specify Your gender"),
    mobile: yup
      .number()
      .required("Please provide Your Number")
      .max(9999999999, "Enter Valid Number")
      .min(1000000000, "Enter Valid Number"),
    id: yup.string().required("Id is required"),
    id_number: yup.mixed().test('id_number', 'Invalid ID number', function() {
      const { id, id_number } = this.parent; // access the parent schema values
    
      if (id === 'Aadhar Card' && /^[0-9]{12}$/.test(id_number)) {
        return true;
      }
    
      if (id === 'PAN Card' && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(id_number)) {
        return true;
      }
    
      return false;
    }),
    contact: yup
      .string("")
      .required("Please provide Gaurdian No.")
      .min(10, "Enter Valid Number"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const btn = useRef()

  const disable = ()=>{
    btn.current.disabled = true;
    btn.current.innerText = "..."
  }

  const enable = ()=>{
    btn.current.disabled = false;
    btn.current.innerText = "Save"

  }


  const onSubmit = async (data) => {
    try{
      disable()
      axios.defaults.baseURL = 'http://localhost:8080'
      const res = await axios.post('/users/save-user', data)
      console.log(res.data);
    }
    catch(err){
      console.log(err);
    }
    finally{
      enable()
    }
  };

  return (
    <div className={form.form}>
      <h4 className={form.link}>
        <Link className={form.l} to="/list">
          See list
        </Link>
      </h4>
      <h2 className={form.heading}>User Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={form.main_form}>
        <h3 className={form.subsection}>Personal Information</h3>
        <div className={form.personal}>
          <div className={form.seprate}>
            <span className={form.label}>Name</span>
            <div className={form.message}>
              <span className={form.err}>{errors.name?.message}</span>
              <input
                className={form.input}
                type="text"
                placeholder="Enter Name"
                {...register("name")}
              />
            </div>
          </div>
          <div className={form.seprate}>
            <span className={form.label}>Age</span>
            <div className={form.message}>
              <span className={form.err}>{errors.age?.message}</span>
              <input
                className={form.input}
                type="number"
                placeholder="Age in Years"
                {...register("age")}
              />
            </div>
          </div>
          <div className={form.seprate}>
            <span className={form.label}>Sex</span>
            <div className={form.message}>
              <span className={form.err}>{errors.sex?.message}</span>
              <select
                {...register("sex")}
                style={{ marginRight: "100px" }}
                className={form.select}
              >
                <option value="" disabled={true} selected>
                  Choose Gender
                </option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
          <div className={form.seprate}>
            <span className={form.label}>Mobile</span>
            <div className={form.message}>
              <span className={form.err}>{errors.mobile?.message}</span>
              <input
                className={form.input}
                type="number"
                placeholder="Mobile No."
                {...register("mobile")}
              />
            </div>
          </div>
          <div className={form.seprate}>
            <span className={form.label}>Govt. ID</span>
            <div className={form.message}>
              <span className={form.err}>{errors.id?.message}</span>
              <select className={form.select} {...register("id")}>
                <option value="" disabled={true} selected>
                  ID Type
                </option>
                <option value="Aadhar Card">Aadhar Card</option>
                <option value="Pan Card">Pan Card</option>
              </select>
            </div>
            <div className={form.message}>
              <span className={form.err}>{errors.id_number?.message}</span>
              <input
                type="text"
                {...register("id_number")}
                placeholder="Enter Gov. ID"
                className={form.input}
              />
            </div>
          </div>
        </div>
        <h3 className={form.subsection}>Contact Details</h3>
        <div className={form.personal}>
          <div className={form.seprate}>
            <span className={form.label}>Guardian Details</span>
            <select className={form.select} {...register("gardType")}>
              <option value="" disabled={true} selected>
                Guardian
              </option>
              <option>Father</option>
              <option>Uncle</option>
              <option>Grandfather</option>
            </select>
            <input
              className={form.input}
              type="text"
              placeholder="Enter Name"
              {...register("gaurdName")}
              style={{ width: "250px" }}
            />
          </div>
          <div className={form.seprate}>
            <span className={form.label}>Email</span>
            <input
              type="email"
              placeholder="Email"
              className={form.input}
              style={{ width: "250px" }}
              {...register("email")}
            />
          </div>
          <div className={form.seprate}>
            <span className={form.label}>Contact No.</span>
            <div className={form.message}>
              <span className={form.err}>{errors.contact?.message}</span>
              <input
                type="number"
                placeholder="Mobile Number"
                className={form.input}
                style={{ width: "200px" }}
                {...register("contact")}
              />
            </div>
          </div>
        </div>
        <h3 className={form.subsection}>Address Details</h3>
        <div className={form.personal}>
          <div className={form.seprate}>
            <span className={form.label}>Address</span>
            <input
              type="text"
              placeholder="Address"
              className={form.input}
              {...register("address")}
            />
          </div>
          <div className={form.seprate}>
            <span className={form.label}>State</span>
            <input
              type="text"
              placeholder="State"
              className={form.input}
              {...register("state")}
            />
          </div>
          <div className={form.seprate}>
            <span className={form.label}>City</span>
            <input
              type="text"
              placeholder="Enter City"
              className={form.input}
              {...register("city")}
            />
          </div>
          <div className={form.seprate}>
            <span className={form.label}>Country</span>
            <input
              type="text"
              placeholder="Country"
              className={form.input}
              {...register("coutry")}
            />
          </div>
          <div className={form.seprate}>
            <span className={form.label}>Pincode</span>
            <input
              type="text"
              placeholder="Enter Pincode"
              className={form.input}
              {...register("pincode")}
            />
          </div>
        </div>
        <h3 className={form.subsection}>Other Details</h3>
        <div className={form.personal}>
          <div className={form.seprate}>
            <span className={form.label}>Occupation</span>
            <input
              type="text"
              placeholder="Enter Occupation"
              className={form.input}
              {...register("occupation")}
            />
          </div>
          <div className={form.seprate}>
            <span className={form.label}>Religion</span>
            <select className={form.select} {...register("religion")}>
              <option value="" disabled={true} selected>
                Choose Religion
              </option>
              <option>Hindu</option>
              <option>Islam</option>
              <option>Buddhism</option>
              <option>Christian</option>
            </select>
          </div>
          <div className={form.seprate}>
            <span className={form.label}>Maritial Status</span>
            <select className={form.select} {...register("status")}>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Separated</option>
            </select>
          </div>
          <div className={form.seprate}>
            <span className={form.label}>Blood Group</span>
            <select className={form.select} {...register("blood")}>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>A+</option>
              <option>A-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>
          <div className={form.seprate}>
            <span className={form.label}>Nationality</span>
            <input
              type="text"
              placeholder="Nationality"
              className={form.input}
              {...register("nationality")}
            />
          </div>
        </div>
        <div className={form.btns}>
          <button ref={btn} className={form.submit} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
