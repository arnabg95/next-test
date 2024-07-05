import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { TriggerSwal } from "@/components/swal";
import React from "react";
import { useFormik } from "formik";
import { EditProfileSchemaYup } from "@/validation/yupvalidation";
import { fetchApi } from "@/http";
import { PROFILE_UPDATE_URL } from "@/constants/urls";
import { revalidatePath } from "next/cache";
import { CustomRevalidateTag } from "@/actions";

type IProps = {
  user: any;
  token: string;
  handleProfileUpdate: () => void;
};

const ProfileDataForm = (props: IProps) => {
  const { user, token, handleProfileUpdate } = props;

  const { values, handleBlur, handleSubmit, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        name: user?.name ?? "Loading...",
        email: user?.email ?? "Loading...",
        bio: user?.bio ?? "Loading...",
      },
      validationSchema: EditProfileSchemaYup,
      onSubmit: async (values) => {
        try {
          await fetchApi(PROFILE_UPDATE_URL, {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
            },
          });
          TriggerSwal(
            "Success",
            "Profile updated successfully",
            "success"
          )
          handleProfileUpdate();
          CustomRevalidateTag("aboutPage");
        } catch (error: any) {
          console.log(error);
          TriggerSwal("Error", error.message, "error");
        }
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        type="text"
        value={values.name}
        label="Name"
        required
        name="name"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.name && touched.name ? (
        <p className="text-[#FF0000] text-sm">{`${errors.name}`}</p>
      ) : null}
      <InputField
        type="email"
        value={values.email}
        label="Email Address"
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        disabled
      />
      {errors.email && touched.email ? (
        <p className="text-[#FF0000] text-sm">{`${errors.email}`}</p>
      ) : null}
      <div className="form-group">
        <label htmlFor="">Bio</label>
        <textarea
          name="bio"
          id=""
          value={values.bio}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="edit-button-wrap">
        {/* <Button type="submit" title="Cancel" className="button" /> */}
        <Button type="submit" title="Save Changes" className="btn" />
      </div>
    </form>
  );
};

export default ProfileDataForm;
