import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from 'i18next-http-backend';

export const i18nOptions = () => ({
    // lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: {
            translation: {
                english: "English",
                spanish: "Español",
                french: "Français",
                welcome: "Welcome",
                signinToContinue: "Sign up to continue.",
                Donthaveanaccount: "Don't have an account?",
                signup: "Sign Up",
                login: "Log In",
                logout: "Log out",
                username: "Username",
                password: "Password",
                confirmPassword: "Confirm password",
                firstName: "First Name",
                lastName: "Last Name",
                email: "Email",
                alreadyHave: "Already have an account?",
                noContacts: "No contacts yet!",
                usernameError: "Username is required",
                usernameError2: "Whitespaces are not allowed at the beginning",
                usernameExistsError: "Username is already taken",
                firstNameError: "First name is required",
                lastNameError: "Last name is required",
                passwordErrorReq: "Password is required",
                passwordError: "Password must contain at least eight characers, one lowercase, uppercase, number, and a symbol",
                confirmPasswordErrorReq: "Confirm password is required",
                confirmPasswordError: "Passwords must be the same",
                emailErrorReq: "Email is required",
                emailError: "Invaild email address",
                emailExistsError: "Email already used",
                searchFriend: "Search a friend!",
                add: "Add",
                newUser: "New User",
                fillForm: "Fill out the form and submit",
                submit: "Submit",
                cancel: "Cancel",
                userCreated: "User created succesfully. Login to start chating",
                addFriendError1: "Invalid user",
                addFriendError2: "Field must be fullfilled",
                addFriendError3: "There is a pending request from this user",
                addFriendError4: "Friend request already sent to this user",
                pendingRequests: "You have friend requests pending",
                contacts: "Contacts",
                conversations: "Conversations",
                deleteQues: "Are you sure to delete this contact?",
                delete: "Delete",
                noConversations: "No conversations yet!",
                searchConversation: "Search a conversation!",
                newGroup: "New Group",
                groupName: "Group Name",
                members: "Members",
                typeMessage: "Type a message",
                scribble: "Scribble",
                scribbleInstruction: "Draw something and send!",
                scribbleError: "Scribble too heavy to send. Try again...",
                settings: "Settings",
                accountSettings: "Account settings",
                manageMembers: "Manage members",
                addMember: "Add member",
                addMemberError1: "Add user to your contact list first",
                addMemberError2: "Already in group",
                removeMember: "Remove member",
                typeUsername: "Type the username and press enter",
                doubleClickHelp: "Double click to edit a chip",
                deleteYourself: "Cannot remove yourself or the user is not a member",
                manageAdministrators: "Manage group administrators",
                addAdminError: "could be an admin or not a member of this group",
                addAdmin: "Add an admin",
                newAdmin: "New admin",
                deleteAdminError: "is not a member of this group and the group must have at least ONE admin",
                removeAdmin: "Remove administrator",
                leaveGroup: "Leave this group",
                leaveGroupQues: "Are you sure to leave this group?",
                leave: "Leave",
                deleteGroup: "Delete this group",
                deleteGroupQues: "Are you sure to delete this group?",
                language: "Language",
                languageSettings: "Language settings",
                preferredLanguage: "Select you preferred language",
                apply: "Apply",
                friendRequest: "Friend requests",
                requestSent: "Friend request sent",
                friendRequestAccepted: "Friend request accepted",
                languageChanged: "Language change applied",
                errorSendMessage: "Message cannot be sent. Try again",
                errorQueryMessages: "Couldn't fetch messages list",
                defaultError: "Something wrong ocurred. Try again",
                userNotFound: "User not found",
                userPasswordIncorrect: "User or password is incorrect",
                missingCredentials: "Missing credentials",
                noCoincidence: "No coincidences",
            }
        },
        es: {
            translation: {
                english: "English",
                spanish: "Español",
                french: "Français",
                welcome: "Bienvenido",
                signinToContinue: "Regístrate para continuar",
                Donthaveanaccount: "¿No tienes una cuenta?",
                signup: "Regístrate",
                username: "Usuario",
                login: "Iniciar sesión",
                logout: "Cerrar sesión",
                password: "Contraseña",
                confirmPassword: "Confirmar contraseña",
                firstName: "Nombre(s)",
                lastName: "Apellido(s)",
                email: "Correo electrónico",
                alreadyHave: "¿Ya tienes una cuenta? ",
                noContacts: "¡Todavía no hay contactos !",
                usernameError: "Usuario es requerido",
                usernameError2: "No se permite iniciar con espacios en blanco",
                usernameExistsError: "Este usuario ya ha sido tomado",
                firstNameError: "Nombre(s) es requerido",
                lastNameError: "Apellido(s) es requerido",
                passwordErrorReq: "Contraseña es requerida",
                passwordError: "La contraseña debe contener al menos 8 caracteres, una minúscula, una mayúscula, un número, y un símbolo",
                confirmPasswordErrorReq: "Confirmar contraseña es requerida",
                confirmPasswordError: "Contraseñas deben coincidir",
                emailErrorReq: "Correo es requerido",
                emailError: "Correo inválido",
                emailExistsError: "Correo ya utilizado",
                searchFriend: "¡Busca a un amigo!",
                add: "Añadir",
                newUser: "Nuevo Usuario",
                fillForm: "Completa los campos y envía",
                submit: "Enviar",
                cancel: "Cancelar",
                userCreated: "Usuario creado exitosamente. Ingresa tu usuario para comenzar a chatear",
                addFriendError1: "Usuario inválido",
                addFriendError2: "El campo debe ser llenado",
                addFriendError3: "Hay una solicitud de amistad pendiente de este usuario",
                addFriendError4: "Solicitud de amistad enviada a este usuario",
                pendingRequests: "Solicitudes de amistad pendientes",
                contacts: "Contactos",
                conversations: "Conversaciones",
                deleteQues: "¿Estás seguro de borrar este contacto?",
                delete: "Borrar",
                noConversations: "¡Todavía no hay conversaciones!",
                searchConversation: "¡Busca una conversación!",
                newGroup: "Nuevo Grupo",
                groupName: "Nombre del grupo",
                members: "Integrantes",
                typeMessage: "Escribe un mensaje",
                scribble: "Garabato",
                scribbleInstruction: "¡Dibuja un mensaje en la ventana y envía!",
                scribbleError: "Mensaje demasiado pesado. Intenta nuevamente...",
                settings: "Configuración",
                accountSettings: "Configuración de cuenta",
                manageMembers: "Administrar integrantes",
                addMember: "Añadir integrante",
                addMemberError1: "Primero añade a este usuario a la lista de contactos",
                addMemberError2: "Ya se encuentra en el grupo",
                removeMember: "Borrar integrante",
                typeUsername: "Escribe el usuario y presiona enter",
                doubleClickHelp: "Doble click para editar",
                deleteYourself: "No pudes borrarte a ti mismo o el usuario no es un integrante",
                manageAdministrators: "Gestionar administradores",
                addAdminError: "ya es administrador o no es un integrante",
                addAdmin: "Agregar un administrador",
                newAdmin: "Nuevo administrador",
                deleteAdminError: "no es un integrante y el grupo debe tener al menos un administrador",
                removeAdmin: "Borrar administrador",
                leaveGroup: "Abandonar grupo",
                leaveGroupQues: "¿Estás seguro de abandonar el grupo?",
                leave: "Salir",
                deleteGroup: "Borrar grupo",
                deleteGroupQues: "¿Estás seguro de borrar este grupo?",
                language: "Lenguaje",
                languageSettings: "Configuración de idioma",
                preferredLanguage: "Selecciona tu lenguage preferido",
                apply: "Aplicar",
                friendRequest: "Solicitudes de amistad",
                requestSent: "Solicitud de amistad enviada",
                friendRequestAccepted: "Solicitud de amistad aceptada",
                languageChanged: "Ajustes de lenguaje aplicado",
                errorSendMessage: "El mensaje no puede ser enviado. Intenta de nuevo",
                errorQueryMessages: "No se pudo recuperar la lista de mensajes",
                userNotFound: "Usuario no encontrado",
                defaultError: "Algo ocurrió no salió bien. Intenta de nuevo",
                userPasswordIncorrect: "Usuario o contraseña inválidas",
                missingCredentials: "Faltan credenciales",
                noCoincidence: "Sin coincidencias",

            }
        },
        fr: {
            translation: {
                english: "English",
                spanish: "Español",
                french: "Français",
                welcome: "Bienvenue",
                signinToContinue: "Inscrivez-vous pour continuer",
                Donthaveanaccount: "Vous n'avez pas de compte?",
                signup: "S'inscrire",
                username: "Utilisateur",
                login: "Se connecter",
                logout: "Se déconnecter",
                password: "Mot de passe",
                confirmPassword: "Confirmer mot de passe",
                firstName: "Prénom",
                lastName: "Nom de famille",
                email: "e-mail",
                alreadyHave: "Vous avez déjà un compte? ",
                noContacts: "Aucun contact pour le moment!",
                usernameError: "Utilisateur requis",
                usernameError2: "Les espaces blancs ne sont pas autorisés au début",
                usernameExistsError: "Nom d'utilisateur déjà pris",
                firstNameError: "Prénom requis",
                lastNameError: "Nom de famille requis",
                passwordErrorReq: "Mot de passe requis",
                passwordError: "Un mot de passe sécurisé se compose d'au moins 8 caractères dont au moins une lettre minuscule, une lettre majuscule et un chiffre",
                confirmPasswordErrorReq: "Confirmer mot de passe requis",
                confirmPasswordError: "Le mot de passe doit correspondre",
                emailErrorReq: "E-mail requis",
                emailError: "E-mail invalide",
                emailExistsError: "E-mail déjà prise",
                searchFriend: "Trouver un ami!",
                add: "Ajouter",
                newUser: "Nouvel utilisateur",
                fillForm: "Remplir l'information et envoyer",
                submit: "Soumettre",
                cancel: "Annuler",
                userCreated: "L'utilisateur a été créé avec succès. Connectez-vous pour commencer à discuter",
                addFriendError1: "Utilisateur invalide",
                addFriendError2: "L'information doit être rempli",
                addFriendError3: "Il y a une demande d'ami en attente de cet utilisateur",
                addFriendError4: "Demande d'ami envoyée à cet utilisateur",
                pendingRequests: "Vous avez des demandes d'amis en attente",
                contacts: "Contacts",
                conversations: "Conversations",
                deleteQues: "Voulez-vous supprimer ce contact?",
                delete: "Supprimer",
                noConversations: "Aucune conversation pour le moment!",
                searchConversation: "Trouvez une conversation!",
                newGroup: "Nouveau groupe",
                groupName: "Nom de groupe",
                members: "Membres",
                typeMessage: "Écrire un message",
                scribble: "Griffonner",
                scribbleInstruction: "Dessinez un message sur la fenêtre et envoyer!",
                scribbleError: "Griffonner trop lourd à envoyer. Essayer à nouveau",
                settings: "Paramètres",
                accountSettings: "Paramètres du compte",
                manageMembers: "Gérer les membres",
                addMember: "Ajouter membre",
                addMemberError1: "Ajoutez d'abord l'utilisateur à votre liste de contacts",
                addMemberError2: "Déjà en groupe",
                removeMember: "Supprimer membre",
                typeUsername: "Tapez le nom d'utilisateur et appuyez sur Entrée",
                doubleClickHelp: "Double-cliquez pour modifier",
                deleteYourself: "Impossible de vous supprimer ou l'utilisateur n'est pas membre",
                manageAdministrators: "Gérer les administrateurs",
                addAdminError: "pourrait être un administrateur ou ne pas être membre",
                addAdmin: "Ajouter un administrateur",
                newAdmin: "Nouvel administrateur",
                deleteAdminError: "n'est pas membre de ce groupe et le groupe doit avoir au moins un administrateur",
                removeAdmin: "Supprimer administrateur",
                leaveGroup: "Quitter ce groupe",
                leaveGroupQues: "Êtes-vous sûr de quitter le groupe?",
                leave: "Quitter",
                deleteGroup: "Supprimer le groupe",
                deleteGroupQues: "Voulez-vous vraiment supprimer ce groupe?",
                languageSettings: "Paramètres de langue",
                language: "Langue",
                preferredLanguage: "Sélectionnez votre langue préférée",
                apply: "Appliquer",
                friendRequest: "Demandes d'amis",
                requestSent: "Demande d'ami envoyée",
                friendRequestAccepted: "Demande d'ami acceptée",
                languageChanged: "Changement de langue appliqué",
                errorSendMessage: "Le message ne peut pas être envoyé",
                errorQueryMessages: "Impossible de récupérer la liste des messages",
                defaultError: "Une erreur s'est produite. Réessayez",
                userNotFound: "Utilisateur non trouvé",
                userPasswordIncorrect: "Nom d'utilisateur ou mot de passe invalide",
                missingCredentials: "Les informations d'identification invalides",
                noCoincidence: "Pas de coïncidences",

            }
        }
    }
}
);

i18next.use(Backend).use(initReactI18next).use(LanguageDetector).init(i18nOptions());

export default i18next;