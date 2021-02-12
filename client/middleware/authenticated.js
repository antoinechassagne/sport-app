export default function ({ store, redirect }) {
  if (!store.state.authentication.loggedUser) {
    return redirect("/login");
  }
}
