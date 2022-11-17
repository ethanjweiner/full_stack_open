# REQUIREMENTS

- Implementing a patient page
  - Route: `/patients/:id`
    - Use `useParams` hook (w/ a type argument) to receive id
  - *Saves active patient's info in app state*
    - Use `Context API` here
    - Store entire patient in state, or just id?
  - Should display:
    - `name`
    - `gender` icon
    - `ssn`
    - `occuptation`
  - Navigation: Clicking patients name (on main page) -> links to patient

## Application Specifications

- Has state: `{ patients: [id: string]: Patient}`

```
{
  patients: [
    'jasg-9803h': Patient
    ...
  ]
}
```