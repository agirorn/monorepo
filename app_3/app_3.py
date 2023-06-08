from fuzzywuzzy import fuzz

def get_string():
    return "STRING"
    # return dir(boto3)

if __name__ == "__main__":
    print(get_string())
    res = fuzz.token_sort_ratio("fuzzy wuzzy was a bear", "wuzzy fuzzy was a bear")
    print(f"found{res}")
