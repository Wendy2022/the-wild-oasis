import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be loaded");
  }
  return data;
}

export async function createCabin(newCabin) {
  //https://doadxveldfyvhboixznn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  //upload files from javascript reference supabase doc
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // delete the cabin if there is an error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}

export async function updateCabin(cabin) {
  const { data, error } = await supabase
    .from("cabins")
    .update({ other_column: "otherValue" })
    .eq("some_column", "someValue")
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be updated");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
