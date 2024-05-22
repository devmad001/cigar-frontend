export default {
  async getAnswers(context) {
    let url = `https://hiscigar.com/api/v1/help/answers`;
    const token = context.getters.token;

    const response = await fetch(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          'Session-Token': token
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.errors || 'Answers Loading is Failed. Please try again');
      throw error;
    }

    context.commit('setAnswers', responseData);
  }
};
