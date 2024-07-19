import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    SectionList
  } from "react-native";
  import { router } from "expo-router";
  import { useEffect, useRef, useState } from "react";
  import axios from "axios";
  import CourseCard from "@/components/cards/course.card";
import { CoursesType } from "@/types/global";
import { SERVER_URL } from "@/utils/url";
  
  export default function AllCourses() {
    const [courses, setCourses] = useState<CoursesType[]>([]);
    const [loading, setLoading] = useState(true);
    const flatListRef = useRef(null);
  
    useEffect(() => {
      axios
        .get(`https://medium-fzcl.onrender.com/api/v1/get-courses`)
        .then((res: any) => {
          setCourses(res.data.courses);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    return (
      <View style={{ flex: 1, marginHorizontal: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#000000",
            }}
          >
            Popular courses
          </Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/courses")}>
            <Text
              style={{
                fontSize: 15,
                color: "#2467EC",
              }}
            >
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          ref={flatListRef}
          data={courses}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => <CourseCard item={item} />}
          scrollEnabled={false}
        />
      </View>
    );
  }