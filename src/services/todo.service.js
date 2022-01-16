import httpService from "./http.service";

const todosEndPoint = "todos/";

const todoService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndPoint, {
      params: { _page: 1, _limit: 20 }
    });
    return data;
  },
  create: async payload => {
    const { data } = await httpService.post(todosEndPoint, payload);
    return data;
  }
};

export default todoService;
