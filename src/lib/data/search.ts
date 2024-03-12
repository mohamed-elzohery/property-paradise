import PropertyModel from "@/models/Property";
import { Property } from "@/types/properties/Property";

export const fetchSearchedProperties = async (
  keyword: string,
  type: string
) => {
  try {
    const keywordRegex = new RegExp(keyword, "i");
    const query: any = {
      $or: [
        {
          name: keywordRegex,
        },
        { description: keywordRegex },
        { "location.street": keywordRegex },
        { "location.state": keywordRegex },
        { "location.zipcode": keywordRegex },
        { "location.city": keywordRegex },
      ],
    };
    if (type !== "") query.type = type;
    console.log(query);

    const props = await PropertyModel.find(query);
    return props as Property[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
