import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import Loader from "@/components/ui/loader";
import { LinearGradient } from "expo-linear-gradient";
import CourseCard from "@/components/cards/course.card";
import { CoursesType } from "@/types/global";
import { SERVER_URL } from "@/utils/url";

export default function CoursesScreen() {
  const [courses, setCourses] = useState<CoursesType[]>([]);
  const [originalCourses, setOriginalCourses] = useState<CoursesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setcategories] = useState([]);
  const [activeCategory, setactiveCategory] = useState("All");

  useEffect(() => {
    axios
      .get(`https://medium-fzcl.onrender.com/api/v1/get-layout/Categories`)
      .then((res) => {
        setcategories(res.data.layout.categories);
        fetchCourses();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchCourses = () => {
    axios
      .get(`https://medium-fzcl.onrender.com/api/v1/get-courses`)
      .then((res: any) => {
        setCourses(res.data.courses);
        setOriginalCourses(res.data.courses);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

 

  const handleCategories = (e: string) => {
    setactiveCategory(e);
    if (e === "All") {
      setCourses(originalCourses);
    } else {
      const filterCourses = originalCourses.filter(
        (i: CoursesType) => i.categories === e
      );
      setCourses(filterCourses);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <LinearGradient
          colors={["#E5ECF9", "#F6F7F9"]}
          style={{ flex: 1, paddingTop: 65 }}
        >
          <View style={{ padding: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor:
                    activeCategory === "All" ? "#2467EC" : "#000",
                  borderRadius: 20,
                  paddingHorizontal: 20,
                  marginRight: 5,
                }}
                onPress={() => handleCategories("All")}
              >
                <Text
                  style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                >
                  All
                </Text>
              </TouchableOpacity>
              {categories?.map((i: any, index: number) => (
                <TouchableOpacity
                key={index}
                  style={{
                    padding: 10,
                    backgroundColor:
                      activeCategory === i?.title ? "#2467EC" : "#000",
                    borderRadius: 50,
                    paddingHorizontal: 20,
                    marginHorizontal: 15,
                  }}
                  onPress={() => handleCategories(i?.title)}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                  >
                    {i?.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View>
            <ScrollView style={{ marginHorizontal: 15, gap: 12 }}>
              {courses?.map((item: CoursesType, index: number) => (
                <CourseCard item={item} key={index} />
              ))}
            </ScrollView>
            {courses?.length === 0 && (
              <Text
                style={{ textAlign: "center", paddingTop: 50, fontSize: 18 }}
              >
                No data available!
              </Text>
            )}
          </View>
        </LinearGradient>
      )}
    </>
  );
}