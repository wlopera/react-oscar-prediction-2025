import { data } from "@/data/data";
import { records } from "@/data/records";

type Category = {
  name: string;
  nominees: string[];
};

type ResultItem = Record<string, string | undefined>;

type UserResult = {
  name: string;
  result: ResultItem[];
};

type SessionState = {
  users: UserResult[];
};

// Metodo privados
const getCategoriesUrl = () => {
  return fetch(
    (process.env.NEXT_PUBLIC_JSONBIN_ALL_CATEGORIES_URL as string) + "/latest",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": process.env.NEXT_PUBLIC_JSONBIN_X_MASTER_KEY as string, // Clave privada
      },
    }
  );
};

const getCategoriesDummy = () => {
  return Promise.resolve(
    new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  );
};

const getAllResultsUrl = () => {
  return fetch(
    (process.env.NEXT_PUBLIC_JSONBIN_ALL_RESULTS as string) + "/latest",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": process.env.NEXT_PUBLIC_JSONBIN_X_MASTER_KEY as string, // Clave privada
      },
    }
  );
};

const getAllResultsDummy = () => {
  return Promise.resolve(
    new Response(JSON.stringify(records), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  );
};

// Metodo publicos

export const getCategories = () => {
  // console.log("URL:", process.env.NEXT_PUBLIC_JSONBIN_ALL_CATEGORIES_URL);
  // console.log(
  //   "KEY:",
  //   process.env.NEXT_PUBLIC_JSONBIN_X_MASTER_KEY
  //     ? "✅ Cargada"
  //     : "❌ No cargada"
  // );

  //return getCategoriesUrl();
  return getCategoriesDummy();
};

export const getAllResults = () => {
  // console.log("URL:", process.env.NEXT_PUBLIC_JSONBIN_ALL_RESULTS);
  // console.log(
  //   "KEY:",
  //   process.env.NEXT_PUBLIC_JSONBIN_X_MASTER_KEY
  //     ? "✅ Cargada"
  //     : "❌ No cargada"
  // );

  //return getAllResultsUrl();
  return getAllResultsDummy();
};

export const updateResultsJsonBin = async (data: SessionState | null) => {
  // console.log("URL:", process.env.NEXT_PUBLIC_JSONBIN_ALL_RESULTS);
  // console.log(
  //   "KEY:",
  //   process.env.NEXT_PUBLIC_JSONBIN_X_MASTER_KEY
  //     ? "✅ Cargada"
  //     : "❌ No cargada"
  // );

  // console.log("Datos enviados:", data);

  if (!data) {
    console.error("Datos de resultados no válidos");
    return;
  }

  try {
    const respuesta = await fetch(
      process.env.NEXT_PUBLIC_JSONBIN_ALL_RESULTS as string,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Bin-Versioning": "false",
          "X-Master-Key": process.env
            .NEXT_PUBLIC_JSONBIN_X_MASTER_KEY as string,
        },
        body: JSON.stringify(data),
      }
    );

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const response = await respuesta.json();
    // console.log("Respuesta:", response);
  } catch (error) {
    console.error("Error al actualizar el bin:", error);
  }
};
