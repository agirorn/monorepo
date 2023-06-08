from fuzzywuzzy import fuzz

def the_dir():
    return "STRING"
    # return dir(boto3)

if __name__ == "__main__":
    print(the_dir())
    res = fuzz.token_sort_ratio("fuzzy wuzzy was a bear", "wuzzy fuzzy was a bear")
    print(f"found{res}")
