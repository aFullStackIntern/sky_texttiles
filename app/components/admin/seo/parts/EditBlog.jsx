import { useEffect, useMemo, useRef, useState } from "react";
import { InnerContainerHead } from "@/app/styledComponents/admin/AdminHead";
import {
  BlueButtonSmall,
  GreenButtonSmall,
} from "@/app/styledComponents/admin/Buttons";
import {
  InnerContainer,
  InnerContainerHeadSection,
  ModalContainer,
} from "@/app/styledComponents/admin/Container";
import {
  InputSection,
  Label,
  TextInput,
} from "@/app/styledComponents/admin/Inputs";
import { Autocomplete, Stack, TextField } from "@mui/material";
import axios from "axios";

const pageData = [
  { label: "home" },
  { label: "blog" },
  { label: "clients" },
  { label: "companyProfile" },
  { label: "skyPrimware" },
  { label: "skyInternational" },
  { label: "skyTextiles" },
  { label: "careers" },
  { label: "enquiry" },
  { label: "contactUs" },
  { label: "infrastructure" },
  { label: "products" },
  { label: "fabrics" },
  { label: "yarns" },
  { label: "garments" },
  { label: "sustainablity" },
  { label: "certs" },
  { label: "csr" },
  { label: "events" },
  { label: "whyUs" },
];

export default function EditBlog({ setEditModalOpen, fetchDepartments, data }) {
  const initialData = {
    title: data?.title || "",
    keywords: data?.keywords || "",
    description: data?.description || "",
  };
  const [metaData, setMetaData] = useState(initialData);

  console.log(data);

  const handleUpdateBlog = async () => {
    const imageData = new FormData();

    try {
      const response = await axios.put(
        `https://skybackend.pmcommu.in/api/v1/seo/updateById?id=${data._id}`,
        metaData,
        {
          headers: {},
        }
      );
      if (response.status === 200) {
        alert("Blog updated successfully!");
        fetchDepartments();
        setEditModalOpen(false);
      } else {
        alert("Failed to update the blog.");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("An error occurred while updating the blog.");
    }
  };

  return (
    <ModalContainer>
      <InnerContainer width={"80%"}>
        <InnerContainerHead>Edit MetaData</InnerContainerHead>
        <InnerContainerHeadSection column>
          <InputSection width={"70%"}>
            <Label width={"100px"}>Title</Label>
            <TextInput
              placeholder="Enter Title"
              value={metaData?.title}
              onChange={(e) =>
                setMetaData({ ...metaData, title: e.target.value })
              }
            />
          </InputSection>

          <InputSection width={"70%"}>
            <Label width={"100px"}>Description</Label>
            <TextInput
              placeholder="Enter Slug"
              value={metaData?.description}
              onChange={(e) =>
                setMetaData({ ...metaData, description: e.target.value })
              }
            />
          </InputSection>
          <InputSection width={"70%"}>
            <Label width={"100px"}>Keywords</Label>
            <TextInput
              placeholder="Enter Title"
              value={metaData?.keywords}
              onChange={(e) =>
                setMetaData({ ...metaData, keywords: e.target.value })
              }
            />
          </InputSection>
          {/* <InputSection width={"70%"}>
            <Label width={"100px"}>Page</Label>
            <Autocomplete
              disablePortal
              options={pageData}
              sx={{ width: 300 }}
              onChange={(e, newValue) =>
                setMetaData({ ...metaData, pagename: newValue.label })
              }
              renderInput={(params) => (
                <TextField
                  sx={{
                    "& .MuiInputBase-root": {
                      padding: "7px 10px",
                    },
                  }}
                  {...params}
                  label="Type here"
                />
              )}
            />
          </InputSection> */}

          <InputSection>
            <Label></Label>
            <Stack direction={"row"} gap={"10px"}>
              <GreenButtonSmall onClick={handleUpdateBlog}>
                Update
              </GreenButtonSmall>{" "}
              <BlueButtonSmall onClick={() => setEditModalOpen(false)}>
                Cancel
              </BlueButtonSmall>
            </Stack>
          </InputSection>
        </InnerContainerHeadSection>
      </InnerContainer>
    </ModalContainer>
  );
}
