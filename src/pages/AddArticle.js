import React, { useEffect, useState } from "react"
import { isAuthenticated, accountRoles } from "./../services/accountService"
import { Formik } from "formik"
import { Button, Container, Form } from "react-bootstrap"
import Loading from "../components/Articles/loader/Loading"
import { getToken } from "../services/tokenService"


const AddArticle = () => {
  const isLogged = isAuthenticated()
  const roles = () => {
    if (isLogged) return accountRoles()
    return []
  }
  const [tags, setTags] = useState([])
  const [token, setToken] = useState("")

  useEffect(() => {
    setToken(getToken())
  }, [])

  const updateTag = (tag) => {
    tags.push(tag)
    setTags(tags)
  }

  function handleSubmit(values) {
    values.picture = "https://picsum.photos/1200/300"
    values.tags = tags
    values.token = token
    try {
      console.log(values)
    } catch (error) {
      console.log(error)
    }
  }

  return isLogged && roles().map((role) => role === "ROLE_ADMIN") ? (
    <Container>
      <div className="content">
        <Formik
          initialValues={{
            title: "",
            content: "",
            picture: "",
            tags: tags,
          }}
          onSubmit={handleSubmit}
          // validationSchema={REGISTER_SCHEMA}
        >
          {({
            values,
            handleSubmit,
            isSubmitting,
            errors,
            handleChange,
            touched,
            handleBlur,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Titre de l'article"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  isInvalid={!!errors.title}
                  isValid={touched.title && !errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Contenu</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="content"
                  placeholder="Contenu de l'article"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                  isInvalid={!!errors.content}
                  isValid={touched.content && !errors.content}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.content}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image à la une</Form.Label>
                <Form.Control
                  type="file"
                  name="picture"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.picture}
                  isInvalid={!!errors.picture}
                  isValid={touched.picture && !errors.picture}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.picture}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Label>Sélectionner le(s) tag(s) :</Form.Label>
              {["php", "symfony"].map((tag, index) => (
                <div key={index} className="mb-3">
                  <Form.Check
                    // @ts-ignore
                    type="checkbox"
                    name="tags"
                    id={`${tag}`}
                    label={`${tag}`}
                    onBlur={handleBlur}
                    onChange={() => updateTag(tag)}
                  />
                </div>
              ))}

              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Envoyer
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  ) : (
    <Loading />
  )
}

export default AddArticle
