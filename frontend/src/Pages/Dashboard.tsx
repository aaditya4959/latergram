import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { modalState } from "../Atoms/modalState";
import { userSignedIn } from "../Atoms/userSignedIn";
import useContent from "../hooks/useContent";
import { Card } from "../Components/Card";
import CreateContentModal from "../Components/CreateContentModal";
import { useEffect } from "react";

export default function Dashboard() {
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [userIn] = useRecoilState(userSignedIn);
    const contents = useContent();
    const navigate = useNavigate();

    // Redirect to signin page if user is not signed in
    useEffect(() => {
        if (!userIn) {
            navigate("/signin"); // Use absolute path for correct redirection
        }
    }, [userIn, navigate]);

    // Return null if redirection is in progress
    if (!userIn) {
        return null;
    }

    return (
        <div className="flex p-2 max-w-full">
            {contents?.map(({ type, link, title }) => (
                <Card key={link} type={type} link={link} title={title} />
            ))}
            <CreateContentModal />
        </div>
    );
}
