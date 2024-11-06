// import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CommentType } from "@/types";
// import { useLocalSearchParams } from "expo-router";
// import Loading from "@/components/Loading";
// import { Colors } from "@/constants/Colors";
// import { Picker } from "@react-native-picker/picker";
// import { Ionicons } from "@expo/vector-icons";
// import moment from "moment";

// const Comments = () => {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const [comments, setComments] = useState<CommentType[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedRating, setSelectedRating] = useState<number | string | null>(null);
//   const [commentLimit, setCommentLimit] = useState(5);

//   useEffect(() => {
//     fetchComments();
//   }, [selectedRating]);

//   const fetchComments = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.ARTTOOL_APP_API_URL}/${id}`
//       );
//       const sortedComments = response.data.comments.sort(
//         (a: CommentType, b: CommentType) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       );
//       setComments(sortedComments);
//       setIsLoading(false);
//     } catch (err) {
//       console.error("Error fetching comments: ", err);
//     }
//   };

//   const renderStars = (rating: number) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <Ionicons
//           key={i}
//           name={i <= rating ? "star" : "star-outline"}
//           size={16}
//           color={i <= rating ? Colors.tabIconSelected : Colors.darkGrey}
//         />
//       );
//     }
//     return <View style={styles.starsContainer}>{stars}</View>;
//   };

//   const filteredComments =
//     selectedRating === null || selectedRating === "all-stars"
//       ? comments
//       : comments.filter((comment) => comment.rating === selectedRating);

//   const displayedComments = filteredComments.slice(0, commentLimit);

//   const formatDate = (dateString: string) => {
//     return moment(dateString).format("MMM DD, YYYY");
//   };

//   const handleSeeMore = () => {
//     setCommentLimit((prevLimit) => prevLimit + 5);
//   };

//   return (
//     <View style={styles.container}>
//       {isLoading ? (
//         <Loading size={"large"} />
//       ) : (
//         <>
//           <View style={styles.filterContainer}>
//             <Text style={styles.filterLabel}>Filter by Rating:</Text>
//             <View style={{ flex: 1 }}>
//               <Picker
//                 selectedValue={selectedRating}
//                 style={styles.picker}
//                 onValueChange={(itemValue) => setSelectedRating(itemValue)}
//               >
//                 <Picker.Item label="All Ratings (Reset)" value={null} />
//                 <Picker.Item label="All Stars" value="all-stars" />
//                 {[1, 2, 3, 4, 5].map((rating) => (
//                   <Picker.Item
//                     key={rating}
//                     label={`${rating} Star${rating > 1 ? "s" : ""}`}
//                     value={rating}
//                   />
//                 ))}
//               </Picker>
//             </View>
//           </View>

//           {displayedComments.length === 0 ? (
//             <Text style={styles.noCommentsText}>No comments available.</Text>
//           ) : (
//             <>
//               <FlatList
//                 data={displayedComments}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                   <View style={styles.commentContainer}>
//                     <View style={styles.commentHeader}>
//                       <Text style={styles.commenterName}>{item.name}</Text>
//                       <Text style={styles.commentDate}>
//                         {formatDate(item.createdAt)}
//                       </Text>
//                     </View>
//                     <Text style={styles.starsContainer}>
//                       {renderStars(item.rating)}{" "}
//                     </Text>
//                     <Text style={styles.commentText}>{item.comment}</Text>
//                   </View>
//                 )}
//               />

//               {filteredComments.length > commentLimit && (
//                 <TouchableOpacity
//                   style={styles.seeMoreButtonContainer}
//                   onPress={handleSeeMore}
//                 >
//                   <Text style={styles.seeMoreButtonText}>See More...</Text>
//                 </TouchableOpacity>
//               )}
//             </>
//           )}
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//     padding: 20,
//   },
//   filterContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   filterLabel: {
//     marginRight: 10,
//     fontSize: 16,
//   },
//   picker: {
//     height: 50,
//     borderColor: Colors.darkGrey,
//     borderWidth: 1,
//     borderRadius: 5,
//   },
//   commentContainer: {
//     marginTop: 10,
//     marginBottom: 15,
//     padding: 10,
//     backgroundColor: Colors.white,
//     borderRadius: 5,
//     borderColor: Colors.lightGrey,
//     borderWidth: 1,
//   },
//   commentHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   commenterName: {
//     fontWeight: "bold",
//   },
//   commentDate: {
//     fontSize: 12,
//     color: Colors.darkGrey,
//   },
//   commentText: {
//     marginTop: 5,
//   },
//   starsContainer: {
//     flexDirection: "row",
//     marginBottom: 10,
//   },
//   noCommentsText: {
//     textAlign: "center",
//     fontSize: 18,
//     color: Colors.darkGrey,
//     marginTop: 20,
//   },
//   seeMoreButtonContainer: {
//     alignItems: "center",
//     marginTop: 10,
//   },
//   seeMoreButtonText: {
//     color: Colors.darkGrey,
//     textDecorationLine: "underline",
//   },
// });

// export default Comments;
