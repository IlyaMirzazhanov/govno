import {getAllTracks,
        getUserById,
        generateAudioUrl,
        generateImgUrl
} from "$lib/api/db";

export async function load() {
  let tracks = await getAllTracks();

  let response = [];

  // @ts-ignore
  for (const t of tracks) {
    const userInfo = await getUserById(t.uploaded_by_id);

    response.push({
      meta: t,
      audioUrl: await generateAudioUrl(t.path_to_audio),
      imgUrl: await generateImgUrl(t.path_to_img),
      userInfo: userInfo,
    });
  }

  return {
    response: response,
  }

}
