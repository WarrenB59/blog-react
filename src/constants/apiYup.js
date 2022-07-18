import * as Yup from 'yup';
import { REGEX_PASSWORD } from './regexConstants';

// Nos Schemas de validation

export const LOGIN_SCHEMA = Yup.object().shape({
    email: Yup.string()
        .email("Adresse Email invalide")
        .required("Ce champ est requis"),
    password: Yup.string()
        .matches (REGEX_PASSWORD,
        "Le mot de passe doit contenir 8 caractères minimum, une majuscule, une minuscule, un chiffre et un caractère spécial(@$!%*#?&)")
        .required("Ce champ est requis")
})

export const REGISTER_SCHEMA = Yup.object().shape({
    name: Yup.string()
        .required("Ce champs est requis"),
    firstname: Yup.string()
        .required("Ce champs est requis"),
    email: Yup.string()
        .email("Adresse email invalide")
        .required("Ce champs est requis"),
    password: Yup.string()
        .matches(REGEX_PASSWORD,
        "Le mot de passe doit contenir 8 caractères au minimum, une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*#?&)")
        .required("Ce champs est requis"),
    verifpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe ne sont pas identiques')
    .required("Ce champs est requis"),
});