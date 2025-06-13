import { useFormStatus } from "react-dom";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import createContact from "../api/createContact";

export const Route = createLazyFileRoute("/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  const mutation = useMutation({
    mutationFn: function (formData) {
      // "use server";
      return createContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message"),
      );
    },
  });

  return (
    <div className="contact">
      <h2>Contact</h2>

      {mutation.isSuccess ? (
        <h3>Submitted!</h3>
      ) : (
        <form action={mutation.mutate}>
          <ContactInput name="name" placeholder="Name" />
          <ContactInput name="email" placeholder="Email" type="email" />

          <textarea placeholder="Message" name="message"></textarea>

          <button type="submit"> Submit</button>
        </form>
      )}
    </div>
  );
}

function ContactInput(props) {
  const { pending } = useFormStatus();
  return (
    <input
      disabled={pending}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}
