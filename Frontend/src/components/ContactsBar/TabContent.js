import { useSelector } from 'react-redux';
import ContactList from "./ContactList";

const TabContent = ({ users }) => {

    const { contactList } = useSelector((state) => state.user.value);

    if (users.length === 0) {
        return (
            <ContactList contacts={contactList} />
        );
    } else {
        return (
            <ContactList contacts={users} />
        );
    }
};

export default TabContent;