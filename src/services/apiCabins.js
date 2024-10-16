import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  //https://doadxveldfyvhboixznn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  //console.log(newCabin, id);
  //这里检查newCabin.image是否存在，并且图片路径是否以supabaseUrl开头。
  //如果newCabin.image已经是一个完整的Supabase存储路径，说明这是一个已经上传过的图片，不需要重新生成路径

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // 如果图片路径已存在且是来自Supabase的URL，并且用户没有上传新的图片，则跳过图片上传
  const shouldUploadImage = !hasImagePath || typeof newCabin.image !== "string";

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  //如果图片路径已经存在（hasImagePath为true），则使用原路径；否则，使用生成的新的imagePath。
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1.create cabin only if there is no id
  let query = supabase.from("cabins");
  //a) create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //b) editquery

  //最终执行 await query.select().single() 时，才会真正执行数据库操作，并将结果存储到 data 和 error 中。
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  //2. upload files from javascript reference supabase doc
  if (shouldUploadImage) {
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
