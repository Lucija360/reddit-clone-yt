import { Flex, Icon } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { BiPoll } from "react-icons/bi";
import {BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from './TabItem';
import TextInputs from '../Posts/PostForm/TextInputs';
import ImageUpload from './PostForm/ImageUpload';
import { User } from 'firebase/auth';
import { Post } from '../../atoms/postAtom';
import { useRouter } from 'next/router';

type NewPostFormProps = {
  user?: User | null;
};


const formTabs: TabItem[] = [
      {
        title: "Post",
        icon: IoDocumentText,
      },
      {
        title: "Images & Video",
        icon: IoImageOutline,
      },
      {
        title: "Link",
        icon: BsLink45Deg,
      },
      {
        title: "Poll",
        icon: BiPoll,
      },
      {
        title: "Talk",
        icon: BsMic,
      },
];

export type TabItem = {
    title: string;
    icon: typeof Icon.arguments;
  };
  


const NewPostForm:React.FC<NewPostFormProps> = ({ 
  user
}) => {

    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const selectFileRef = useRef<HTMLInputElement>(null);
    const [textInputs, setTextInputs] = useState({
      title: "",
      body: "",
    });
    const  [selectedFile, setSelectedFile] = useState<string>();


    const handleCreatePost = async () => {

      const {communityId} = router.query;
       
          const newPost: Post = {

          };
    };

    const onSelectImage= (event: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      if (event.target.files?.[0]) {
        reader.readAsDataURL(event.target.files[0]);
      }
      reader.onload = (readerEvent) => {
        if (readerEvent.target?.result) {
          setSelectedFile(readerEvent.target?.result as string);
        }
      };
    };

    const onTextChange = ({
      target: { name, value },
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTextInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    
    return(
        <Flex direction="column" bg="white" borderRadius={4} mt={2}>
            <Flex width="100%">
                    {formTabs.map((item, index) => (
                        <TabItem 
                        key={index}
                        item={item} 
                        selected={item.title === selectedTab} setSelectedTab={setSelectedTab}
                        />
                    ))}
            </Flex>
            <Flex p={4}>
            {selectedTab === "Post" && (
              <TextInputs 
              textInputs={textInputs} 
              handleCreatePost={handleCreatePost} 
              onChange={onTextChange} 
              loading={loading}
              />
              )}
              {selectedTab === "Images & Video" && <ImageUpload 
               selectedFile={selectedFile}
               setSelectedFile={setSelectedFile}
               setSelectedTab={setSelectedTab}
               selectFileRef={selectFileRef}
               onSelectImage={onSelectImage}

              /> }
            </Flex>
        </Flex>
    )
}
export default NewPostForm;