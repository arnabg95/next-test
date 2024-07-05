"use client";
import Button from "@/components/common/Button";
import InnerBanner from "@/components/common/InnerBanner";
import InputField from "@/components/common/InputField";
import Textarea from "@/components/common/Textarea";
import { TriggerSwal } from "@/components/swal";
import { fetchApi } from "@/http";
import { contactSchema } from "@/validation/yupvalidation";
import { useFormik } from "formik";
import React from "react";

export default function ContactPage() {
  const contactForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values, fHelper) => {
      await fetchApi("web/contact-us", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response: any) => {
        TriggerSwal("Success", "Message sent successfully", "success").then(
          (e) => {
            if (e.isConfirmed) {
              fHelper.resetForm();
            }
          }
        );
      });
    },
  });
  return (
    <>
      <div className="col-lg-8">
        <InnerBanner title="Contact Us" />
        <div className="white-bg-shw contact-box">
          <form onSubmit={contactForm.handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <InputField
                  type="text"
                  placeholder="Enter your name"
                  label="Your Name *"
                  name="name"
                  onChange={contactForm.handleChange}
                  onBlur={contactForm.handleBlur}
                  value={contactForm.values.name}
                  error={
                    contactForm.errors.name && contactForm.touched.name
                      ? contactForm.errors.name
                      : ""
                  }
                />
              </div>
              <div className="col-lg-6">
                <InputField
                  type="email"
                  placeholder="Enter your email"
                  label="Your Email *"
                  name="email"
                  onChange={contactForm.handleChange}
                  onBlur={contactForm.handleBlur}
                  value={contactForm.values.email}
                  error={
                    contactForm.errors.email && contactForm.touched.email
                      ? contactForm.errors.email
                      : ""
                  }
                />
              </div>
              <div className="col-lg-12">
                <Textarea
                  placeholder="Enter your message"
                  label="Message *"
                  onChange={contactForm.handleChange}
                  onBlur={contactForm.handleBlur}
                  value={contactForm.values.message}
                  name="message"
                  error={
                    contactForm.errors.message && contactForm.touched.message
                      ? contactForm.errors.message
                      : ""
                  }
                />
              </div>
              <div className="col-lg-12">
                <Button type="submit" className="btn" title="Submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-lg-2"></div>
    </>
  );
}
