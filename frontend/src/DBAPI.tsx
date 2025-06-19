const BASE_URL = "http://localhost:8080"; // בסיס ה-URL

// קריאת GET גנרית
export async function fetchResource(resource : string, queryParams = {}) {
  try {
    let url = `${BASE_URL}/${resource}`;
    const queryString = new URLSearchParams(queryParams).toString();
    if (queryString) url += `?${queryString}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${resource}: ${response.statusText}`);

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// הוספת רשומה חדשה (POST)
export async function addResource( resource : string, newData: any) {
  try {
    const response = await fetch(`${BASE_URL}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) throw new Error(`Failed to add ${resource}: ${response.statusText}`);

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// עדכון רשומה קיימת (PUT)
export async function updateResource(resource: string, id : number, updatedData: any) {
  try {
    console.log("Sending PUT request to:", `${BASE_URL}/${resource}/${id}`);
    console.log("Data to update:", updatedData);
    const response = await fetch(`${BASE_URL}/${resource}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      console.error(`Failed to update ${resource}: ${response.statusText}`);
      throw new Error(`Failed to update ${resource}: ${response.statusText}`);
    }

   const updatedPhoto = await response.json();
    console.log("Updated photo:", updatedPhoto); // הדפסת התמונה המעודכנת
    return updatedPhoto;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// מחיקת רשומה קיימת (DELETE)
export async function deleteResource(resource: string, id: number) {
  try {
    const response = await fetch(`${BASE_URL}/${resource}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`Failed to delete ${resource}: ${response.statusText}`);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}