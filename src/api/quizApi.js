import makeRequest from "./makeRequest";
import config from "../config";

const read = async (id) => {
  return await makeRequest({ url: `${config.quizApiUri}/read` });
};

const create = async (body) => {
  return await makeRequest({
    method: "post",
    url: `${config.quizApiUri}/create`,
    data: body,
  });
};

const deleteOne = async (id) => {
  return await makeRequest({
    method: "delete",
    url: `${config.quizApiUri}/delete/${id}`,
  });
};

export { create, read, deleteOne };
