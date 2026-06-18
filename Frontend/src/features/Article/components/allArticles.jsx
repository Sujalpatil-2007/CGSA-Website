const Articles = () => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
  const fetchArticles = async () => {
    try {
      const data = await getAllArticles();
      setArticles(data.articles);
    } catch (err) {
      console.log(err);
    }
  };

  fetchArticles();
}, []);
}