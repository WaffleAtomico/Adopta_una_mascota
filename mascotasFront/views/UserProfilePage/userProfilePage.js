import { initNavbar } from "../../components/navbar.js";
import { createUserProfile } from "../../components/user.profile.js";

document.addEventListener("DOMContentLoaded", () => {

    initNavbar();

    const testUserProfileContainer = document.getElementById("UserProfile");
    const testUserProfile = createUserProfile();
    testUserProfileContainer.innerHTML = testUserProfile;
});