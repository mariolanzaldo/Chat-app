import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

export default function Image() {
    const { avatar } = useSelector((state) => state.user.value);

    return <Avatar src={avatar} />;
};