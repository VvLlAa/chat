import {CardUser} from "../Shared/CardUser.tsx";

interface HeaderChatProps {
    phoneClient: string;
}

export const HeaderChat: React.FC<HeaderChatProps> = ({ phoneClient }) => {
    return (
        <div style={{ backgroundColor: "#26343b" }}>
            <CardUser phoneClient={phoneClient}/>
        </div>
    );
};
